#!/usr/bin/env python3
"""
Image optimization script for portfolio project.
Converts images to WebP, compresses, and generates responsive sizes.

Usage:
    python optimize_images.py --input <input_dir> --output <output_dir>
    
Example:
    python optimize_images.py --input frontend/public/images --output frontend/public/images/optimized
"""

import argparse
import os
import sys
from pathlib import Path
from PIL import Image

# Responsive image sizes to generate
SIZES = {
    'thumbnail': 400,
    'medium': 800,
    'large': 1200,
}

# WebP quality (0-100, 80-85 is good balance)
WEBP_QUALITY = 85

def optimize_image(input_path: Path, output_dir: Path):
    """
    Optimize a single image: convert to WebP and generate multiple sizes.
    
    Args:
        input_path: Path to source image
        output_dir: Directory to save optimized images
    """
    try:
        # Open image
        img = Image.open(input_path)
        
        # Convert RGBA to RGB if needed (for JPEG compatibility)
        if img.mode in ('RGBA', 'LA', 'P'):
            background = Image.new('RGB', img.size, (255, 255, 255))
            if img.mode == 'P':
                img = img.convert('RGBA')
            background.paste(img, mask=img.split()[-1] if img.mode == 'RGBA' else None)
            img = background
        
        # Get base filename without extension
        base_name = input_path.stem
        
        # Generate responsive sizes
        for size_name, width in SIZES.items():
            # Skip if image is smaller than target size
            if img.width < width:
                continue
                
            # Calculate height maintaining aspect ratio
            aspect_ratio = img.height / img.width
            height = int(width * aspect_ratio)
            
            # Resize image
            resized = img.resize((width, height), Image.Resampling.LANCZOS)
            
            # Save as WebP
            output_path = output_dir / f"{base_name}-{width}w.webp"
            resized.save(output_path, 'WEBP', quality=WEBP_QUALITY, method=6)
            
            print(f"  ✅ Created {output_path.name} ({width}x{height})")
        
        # Also save original size as WebP
        original_output = output_dir / f"{base_name}.webp"
        img.save(original_output, 'WEBP', quality=WEBP_QUALITY, method=6)
        print(f"  ✅ Created {original_output.name} (original size)")
        
    except Exception as e:
        print(f"  ❌ Error processing {input_path.name}: {str(e)}")

def main():
    parser = argparse.ArgumentParser(description='Optimize images for web delivery')
    parser.add_argument('--input', required=True, help='Input directory containing images')
    parser.add_argument('--output', required=True, help='Output directory for optimized images')
    args = parser.parse_args()
    
    input_dir = Path(args.input)
    output_dir = Path(args.output)
    
    # Validate input directory
    if not input_dir.exists():
        print(f"❌ Input directory does not exist: {input_dir}")
        sys.exit(1)
    
    # Create output directory
    output_dir.mkdir(parents=True, exist_ok=True)
    
    # Find all images
    image_extensions = {'.jpg', '.jpeg', '.png'}
    images = [
        f for f in input_dir.iterdir() 
        if f.is_file() and f.suffix.lower() in image_extensions
    ]
    
    if not images:
        print(f"⚠️  No images found in {input_dir}")
        sys.exit(0)
    
    print(f"🖼️  Found {len(images)} images to optimize\n")
    
    # Process each image
    for img_path in images:
        print(f"Processing {img_path.name}...")
        optimize_image(img_path, output_dir)
        print()
    
    print(f"✨ Optimization complete! Check {output_dir}")
    
    # Show size comparison
    input_size = sum(f.stat().st_size for f in images)
    output_size = sum(f.stat().st_size for f in output_dir.iterdir() if f.is_file())
    reduction = ((input_size - output_size) / input_size) * 100
    
    print(f"\n📊 Size reduction: {reduction:.1f}%")
    print(f"   Before: {input_size / 1024 / 1024:.2f} MB")
    print(f"   After:  {output_size / 1024 / 1024:.2f} MB")

if __name__ == "__main__":
    main()
