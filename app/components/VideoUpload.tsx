'use client';

import { useState, useRef } from 'react';
import { FiUpload, FiX, FiCheck, FiAlertCircle, FiMail, FiPlay } from 'react-icons/fi';

interface UploadStatus {
  isUploading: boolean;
  progress: number;
  success: boolean;
  error: string | null;
  fileName?: string;
  file?: File;
  thumbnail?: string;
}

interface EmailPrompt {
  show: boolean;
  email: string;
  isSubmitting: boolean;
  submitted: boolean;
  error: string | null;
}

export default function VideoUpload() {
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>({
    isUploading: false,
    progress: 0,
    success: false,
    error: null
  });
  const [emailPrompt, setEmailPrompt] = useState<EmailPrompt>({
    show: false,
    email: '',
    isSubmitting: false,
    submitted: false,
    error: null
  });
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = async (file: File) => {
    console.log('=== FRONTEND UPLOAD DEBUG ===');
    console.log('File received:', {
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: file.lastModified
    });

    // Check if it's a video file
    const videoTypes = ['video/mp4', 'video/avi', 'video/mov', 'video/quicktime', 'video/wmv', 'video/flv', 'video/webm', 'video/mkv'];
    if (!videoTypes.includes(file.type)) {
      console.log('Unsupported file type, using fallback mode:', file.type);
      // Instead of showing error, use fallback mode with just filename and gradient thumbnail
      setUploadStatus({
        isUploading: false,
        progress: 100,
        success: true,
        error: null,
        fileName: file.name,
        file: file
        // No thumbnail - will use gradient fallback in the UI
      });
      
      // Initialize email prompt state
      setEmailPrompt({
        show: false,
        email: '',
        isSubmitting: false,
        submitted: false,
        error: null
      });
      return;
    }

    // Check file size (max 100MB) - fallback to filename and gradient thumbnail if too large
    if (file.size > 100 * 1024 * 1024) {
      console.log('File too large, using fallback mode:', file.size, 'bytes');
      // Instead of showing error, use fallback mode with just filename and gradient thumbnail
      setUploadStatus({
        isUploading: false,
        progress: 100,
        success: true,
        error: null,
        fileName: file.name,
        file: file
        // No thumbnail - will use gradient fallback in the UI
      });
      
      // Initialize email prompt state
      setEmailPrompt({
        show: false,
        email: '',
        isSubmitting: false,
        submitted: false,
        error: null
      });
      return;
    }

    console.log('File validation passed, generating thumbnail...');
    
    try {
      const thumbnail = await generateThumbnail(file);
      setUploadStatus({
        isUploading: false,
        progress: 100,
        success: true,
        error: null,
        fileName: file.name,
        file: file,
        thumbnail: thumbnail
      });
    } catch (error) {
      console.error('Error generating thumbnail:', error);
      // Fallback to no thumbnail if generation fails
      setUploadStatus({
        isUploading: false,
        progress: 100,
        success: true,
        error: null,
        fileName: file.name,
        file: file
      });
    }

    // Initialize email prompt state
    setEmailPrompt({
      show: false,
      email: '',
      isSubmitting: false,
      submitted: false,
      error: null
    });
  };

  const resetUpload = () => {
    setUploadStatus({
      isUploading: false,
      progress: 0,
      success: false,
      error: null,
      thumbnail: undefined
    });
    setEmailPrompt({
      show: false,
      email: '',
      isSubmitting: false,
      submitted: false,
      error: null
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const generateThumbnail = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const video = document.createElement('video');
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      video.onloadedmetadata = () => {
        // Set canvas size
        canvas.width = 160;
        canvas.height = 120;
        
        // Seek to 1 second to get a good frame
        video.currentTime = 1;
      };
      
      video.onseeked = () => {
        if (ctx) {
          // Draw the video frame to canvas
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          // Convert to data URL
          const thumbnail = canvas.toDataURL('image/jpeg', 0.8);
          resolve(thumbnail);
        } else {
          reject(new Error('Could not get canvas context'));
        }
      };
      
      video.onerror = () => {
        reject(new Error('Error loading video'));
      };
      
      // Load the video file
      video.src = URL.createObjectURL(file);
    });
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailPrompt(prev => ({ ...prev, error: null }));
    
    if (!emailPrompt.email) {
      setEmailPrompt(prev => ({ ...prev, error: 'Please enter your email address' }));
      return;
    }
    
    if (!validateEmail(emailPrompt.email)) {
      setEmailPrompt(prev => ({ ...prev, error: 'Please enter a valid email address' }));
      return;
    }

    setEmailPrompt(prev => ({ ...prev, isSubmitting: true }));
    
    try {
      // Dummy upload - just call the endpoint without sending file data
      console.log('Calling dummy upload endpoint...');
      const formData = new FormData();
      
      // Optionally, you can skip sending the file entirely:
      // formData.append('file', uploadStatus.file);
      
      const uploadResponse = await fetch('/api/dropbox/upload', {
        method: 'POST',
        body: formData
      });

      if (!uploadResponse.ok) {
        const errorData = await uploadResponse.json();
        throw new Error(errorData.error || 'Upload request failed');
      }

      console.log('Dummy upload completed successfully');

      // Then send email to Make.com webhook
      await fetch('https://hook.us2.make.com/8hamrtcq1dj54cfvmrpwb72mok8lb417', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: emailPrompt.email }),
      });
      
      console.log('Email submitted:', emailPrompt.email);
      setEmailPrompt(prev => ({ 
        ...prev, 
        isSubmitting: false, 
        submitted: true 
      }));
      
    } catch (err) {
      console.error('Upload error:', err);
      setEmailPrompt(prev => ({ 
        ...prev, 
        isSubmitting: false, 
        error: 'Something went wrong. Please try again.' 
      }));
    }
  };

  return (
    <div className="w-full">
      {!uploadStatus.success && !uploadStatus.error && !uploadStatus.isUploading && (
        <div
          className={`relative border-2 border-dashed rounded-lg p-4 text-center transition-colors cursor-pointer ${
            dragActive 
              ? 'border-blue-400 bg-blue-50' 
              : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="video/*"
            onChange={handleFileInput}
            className="hidden"
          />
          
          <div className="flex items-center justify-center space-x-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <FiUpload className="w-6 h-6 text-blue-600" />
            </div>
            
            <div className="text-left">
              <h3 className="text-base font-semibold text-gray-900 mb-1">
                Drop your video here
              </h3>
              <p className="text-sm text-gray-600">
                or{' '}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  browse files
                </button>
              </p>
            </div>
          </div>
        </div>
      )}

      {uploadStatus.isUploading && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-sm">Uploading...</h3>
              <p className="text-xs text-gray-600">{uploadStatus.fileName}</p>
            </div>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div 
              className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${uploadStatus.progress}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-600 mt-1">{uploadStatus.progress}% complete</p>
        </div>
      )}

      {uploadStatus.success && !emailPrompt.submitted && (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6 relative">
          {/* Remove button */}
          <button
            onClick={resetUpload}
            className="absolute top-3 right-3 w-6 h-6 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-colors group"
            title="Remove video"
          >
            <FiX className="w-3 h-3 text-gray-600 group-hover:text-gray-800" />
          </button>
          
          <div className="text-center mb-6">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <div className="w-16 h-12 rounded-lg shadow-lg relative overflow-hidden bg-gray-200">
                {uploadStatus.thumbnail ? (
                  <img 
                    src={uploadStatus.thumbnail} 
                    alt="Video thumbnail" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                    <FiPlay className="w-6 h-6 text-white" />
                  </div>
                )}
              </div>
              <div className="text-left">
                <h3 className="font-bold text-gray-900 text-lg">Video ready for processing!</h3>
                <p className="text-sm text-gray-600 mb-1">{uploadStatus.fileName}</p>
                <p className="text-xs text-gray-500">Submit your email to receive your viral shorts</p>
              </div>
            </div>
          </div>
          
          <form onSubmit={handleEmailSubmit} className="space-y-3">
            <div className="flex space-x-2">
              <input
                type="email"
                value={emailPrompt.email}
                onChange={(e) => setEmailPrompt(prev => ({ ...prev, email: e.target.value }))}
                placeholder="Enter your email address"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm text-black"
                disabled={emailPrompt.isSubmitting}
              />
              <button
                type="submit"
                disabled={emailPrompt.isSubmitting}
                className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {emailPrompt.isSubmitting ? 'Sending...' : 'Get My Shorts'}
              </button>
            </div>
            
            {emailPrompt.error && (
              <p className="text-red-500 text-xs">{emailPrompt.error}</p>
            )}
          </form>
        </div>
      )}

      {uploadStatus.success && emailPrompt.submitted && (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiCheck className="w-6 h-6 text-white" />
            </div>
            <p className="text-lg text-green-700 font-bold mb-2">You will receive your edited shorts in your inbox soon!</p>
            <p className="text-sm text-gray-600">Make sure to check your spam folder too</p>
          </div>
        </div>
      )}

      {uploadStatus.error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center">
              <FiAlertCircle className="w-3 h-3 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-sm">Upload Failed</h3>
              <p className="text-xs text-gray-600">{uploadStatus.fileName}</p>
            </div>
          </div>
          <p className="text-xs text-red-700 mb-3">{uploadStatus.error}</p>
          <button
            onClick={resetUpload}
            className="text-xs text-red-600 hover:text-red-700 font-medium"
          >
            Try again
          </button>
        </div>
      )}


    </div>
  );
} 