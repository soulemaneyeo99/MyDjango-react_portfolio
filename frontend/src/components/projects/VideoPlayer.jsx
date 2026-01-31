// ========== frontend/src/components/projects/VideoPlayer.jsx ==========
import React, { useState } from 'react';
import { getVideoType, generateEmbedUrl, getVideoThumbnail } from '../../utils/videoHelpers';

const VideoPlayer = ({
    videoUrl,
    videoFile,
    videoType,
    customThumbnail,
    title = 'Project Demo'
}) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Determine the actual video type if not provided
    const actualType = videoType || getVideoType(videoUrl || videoFile);

    // Get the appropriate video source
    const videoSource = videoUrl || videoFile;

    // Generate embed URL for external videos
    const embedUrl = actualType !== 'local' && actualType !== 'none'
        ? generateEmbedUrl(videoSource, actualType)
        : videoSource;

    // Get thumbnail
    const thumbnail = customThumbnail || getVideoThumbnail(videoSource, actualType);

    // Handle play button click
    const handlePlay = () => {
        setIsLoading(true);
        setIsPlaying(true);
    };

    // If no video, return null
    if (actualType === 'none' || !videoSource) {
        return null;
    }

    return (
        <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden group">
            {!isPlaying ? (
                // Thumbnail with play button
                <div className="relative w-full h-full cursor-pointer" onClick={handlePlay}>
                    {thumbnail ? (
                        <img
                            src={thumbnail}
                            alt={`${title} thumbnail`}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                            <svg className="w-24 h-24 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M10 20H14V4H10V20ZM4 20H8V12H4V20ZM16 9V20H20V9H16Z" />
                            </svg>
                        </div>
                    )}

                    {/* Play button overlay */}
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center">
                        <div className="w-20 h-20 bg-indigo-500 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-2xl">
                            <svg className="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        </div>
                    </div>

                    {/* Video type badge */}
                    <div className="absolute top-4 right-4 px-3 py-1 bg-black/70 backdrop-blur-sm rounded-full">
                        <span className="text-xs font-mono text-white uppercase tracking-wider">
                            {actualType === 'youtube' && '▶ YouTube'}
                            {actualType === 'vimeo' && '▶ Vimeo'}
                            {actualType === 'local' && '▶ Video'}
                        </span>
                    </div>
                </div>
            ) : (
                // Video player
                <div className="w-full h-full">
                    {isLoading && (
                        <div className="absolute inset-0 bg-black flex items-center justify-center">
                            <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    )}

                    {(actualType === 'youtube' || actualType === 'vimeo') ? (
                        <iframe
                            src={embedUrl}
                            title={title}
                            className="w-full h-full"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            onLoad={() => setIsLoading(false)}
                        />
                    ) : (
                        <video
                            src={embedUrl}
                            controls
                            autoPlay
                            className="w-full h-full"
                            onLoadedData={() => setIsLoading(false)}
                        >
                            Votre navigateur ne supporte pas la lecture de vidéos.
                        </video>
                    )}
                </div>
            )}
        </div>
    );
};

export default VideoPlayer;
