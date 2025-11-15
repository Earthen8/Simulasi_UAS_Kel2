import React from 'react';

function VideoBackground({ videoSrc, children }) {
    return (
        <div className="relative w-full min-h-screen overflow-hidden">
            {/* Video Element */}
            <video 
                autoPlay 
                loop 
                muted 
                playsInline
                className="absolute inset-0 w-full h-full object-cover z-0"
            >
                <source src={videoSrc} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            
            {/* Overlay Gelap */}
            <div className="absolute inset-0 bg-black opacity-30 z-10"></div>
            
            <div className="relative z-20 flex items-center justify-center min-h-screen p-4">
                {children}
            </div>
        </div>
    );
}

export default VideoBackground;