# Deployment Guide - Browne Bioactives

## Overview

This guide covers deploying both B2C (consumer) and B2B (business) sites.

- **B2C Consumer Site**: `brownebioactives.com` → `/var/www/brownebioactives-consumer`
- **B2B Business Site**: `business.brownebioactives.com` → `/var/www/brownebioactives.com`

---

## B2C Consumer Site Deployment

### 1. Build and Deploy

```bash
cd /home/ab/projects/BrowneBioactives/browne-bioactives-consumer
./deploy.sh
```

This will:
- Build the React app
- Create `/var/www/brownebioactives-consumer/`
- Copy files and set permissions

### 2. Configure Nginx

```bash
# Copy nginx config to sites-available
sudo cp brownebioactives-consumer.nginx.conf /etc/nginx/sites-available/brownebioactives.com

# Enable the site (create symlink)
sudo ln -sf /etc/nginx/sites-available/brownebioactives.com /etc/nginx/sites-enabled/

# Test nginx configuration
sudo nginx -t

# Reload nginx
sudo systemctl reload nginx
```

### 3. Setup SSL (Optional but Recommended)

```bash
sudo certbot --nginx -d brownebioactives.com -d www.brownebioactives.com
```

---

## B2B Business Site (Subdomain) Setup

### 1. Configure Nginx for Subdomain

```bash
# Copy nginx config for business subdomain
sudo cp /home/ab/projects/BrowneBioactives/browne-bioactives/business.brownebioactives.nginx.conf /etc/nginx/sites-available/business.brownebioactives.com

# Enable the site
sudo ln -sf /etc/nginx/sites-available/business.brownebioactives.com /etc/nginx/sites-enabled/

# Test nginx configuration
sudo nginx -t

# Reload nginx
sudo systemctl reload nginx
```

### 2. Setup SSL for Subdomain

**You mentioned you'll handle this yourself. When ready:**

```bash
sudo certbot --nginx -d business.brownebioactives.com -d www.business.brownebioactives.com
```

---

## DNS Configuration Required

Make sure your DNS records are set up:

### For brownebioactives.com (B2C):
```
A     brownebioactives.com      → YOUR_SERVER_IP
A     www.brownebioactives.com  → YOUR_SERVER_IP
```

### For business.brownebioactives.com (B2B):
```
A     business.brownebioactives.com     → YOUR_SERVER_IP
A     www.business.brownebioactives.com → YOUR_SERVER_IP
```

---

## Verification

### Check B2C Site:
```bash
curl -I http://brownebioactives.com
```

### Check B2B Site:
```bash
curl -I http://business.brownebioactives.com
```

### Check Nginx Status:
```bash
sudo systemctl status nginx
```

### View Nginx Logs:
```bash
# Access logs
sudo tail -f /var/log/nginx/access.log

# Error logs
sudo tail -f /var/log/nginx/error.log
```

---

## File Locations Summary

### B2C Consumer Site:
- **Source**: `/home/ab/projects/BrowneBioactives/browne-bioactives-consumer/`
- **Deploy**: `/var/www/brownebioactives-consumer/`
- **Nginx Config**: `/etc/nginx/sites-available/brownebioactives.com`
- **Domain**: `brownebioactives.com`

### B2B Business Site:
- **Source**: `/home/ab/projects/BrowneBioactives/browne-bioactives/`
- **Deploy**: `/var/www/brownebioactives.com/`
- **Nginx Config**: `/etc/nginx/sites-available/business.brownebioactives.com`
- **Domain**: `business.brownebioactives.com`

---

## Troubleshooting

### Issue: Permission Denied
```bash
sudo chown -R www-data:www-data /var/www/brownebioactives-consumer
sudo chown -R www-data:www-data /var/www/brownebioactives.com
```

### Issue: Port 80 Already in Use
```bash
sudo netstat -tulpn | grep :80
sudo systemctl stop nginx
sudo systemctl start nginx
```

### Issue: Nginx Test Fails
```bash
sudo nginx -t
# Read the error message and fix the config file
```

### Issue: 404 on Routes
Make sure `try_files $uri $uri/ /index.html;` is in the nginx config (already included).

---

## Updating Sites

### Update B2C Consumer:
```bash
cd /home/ab/projects/BrowneBioactives/browne-bioactives-consumer
git pull  # if using git
./deploy.sh
```

### Update B2B Business:
```bash
cd /home/ab/projects/BrowneBioactives/browne-bioactives
./deploy.sh
```

---

## Quick Reference Commands

```bash
# Reload nginx after config changes
sudo systemctl reload nginx

# Restart nginx (more aggressive)
sudo systemctl restart nginx

# Check nginx status
sudo systemctl status nginx

# Test nginx config
sudo nginx -t

# View enabled sites
ls -la /etc/nginx/sites-enabled/
```
