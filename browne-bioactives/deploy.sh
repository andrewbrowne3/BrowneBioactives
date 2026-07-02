#!/bin/bash

set -e  # Exit immediately if a command exits with a non-zero status

echo "🚀 Starting Browne Bioactives deployment..."

echo "📦 Building application..."
npm run build || { echo "❌ Build failed"; exit 1; }

echo "📁 Creating deployment directory..."
sudo mkdir -p /var/www/brownebioactives.com || { echo "❌ Failed to create directory"; exit 1; }

echo "📋 Copying build files to /var/www/brownebioactives.com..."
sudo cp -rp dist/* /var/www/brownebioactives.com/ || { echo "❌ Failed to copy files to server"; exit 1; }

echo "🔐 Setting proper permissions..."
sudo chown -R www-data:www-data /var/www/brownebioactives.com || { echo "❌ Failed to set permissions"; exit 1; }

echo "✅ Deployment completed successfully!"
echo "🌐 Site files are ready at /var/www/brownebioactives.com"
echo "📋 Don't forget to:"
echo "   1. Enable the nginx site: sudo ln -s /etc/nginx/sites-available/brownebioactives.com /etc/nginx/sites-enabled/"
echo "   2. Test nginx config: sudo nginx -t"
echo "   3. Reload nginx: sudo systemctl reload nginx"