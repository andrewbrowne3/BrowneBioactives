#!/bin/bash

set -e  # Exit immediately if a command exits with a non-zero status

echo "🚀 Starting Browne Bioactives Consumer (B2C) deployment..."

echo "📦 Building application..."
npm run build || { echo "❌ Build failed"; exit 1; }

echo "📁 Creating deployment directory..."
sudo mkdir -p /var/www/brownebioactives-consumer || { echo "❌ Failed to create directory"; exit 1; }

echo "📋 Copying build files to /var/www/brownebioactives-consumer..."
sudo cp -rp dist/* /var/www/brownebioactives-consumer/ || { echo "❌ Failed to copy files to server"; exit 1; }

echo "🔐 Setting proper permissions..."
sudo chown -R www-data:www-data /var/www/brownebioactives-consumer || { echo "❌ Failed to set permissions"; exit 1; }

echo "✅ B2C Consumer site deployment completed successfully!"
echo "🌐 Site files are ready at /var/www/brownebioactives-consumer"
echo "📋 Don't forget to:"
echo "   1. Copy nginx config: sudo cp brownebioactives-consumer.nginx.conf /etc/nginx/sites-available/brownebioactives.com"
echo "   2. Enable the nginx site: sudo ln -s /etc/nginx/sites-available/brownebioactives.com /etc/nginx/sites-enabled/"
echo "   3. Test nginx config: sudo nginx -t"
echo "   4. Reload nginx: sudo systemctl reload nginx"
