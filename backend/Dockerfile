FROM php:8.2-fpm

ARG user
ARG uid

ENV APP_ENV=production

# Install system dependencies
RUN apt-get update && apt-get install -y \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    nano

# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

#ADD ./php/custom-php.ini /usr/local/etc/php/conf.d/custom-php.ini

# Get latest Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Create system user to run Composer and Artisan Commands
RUN useradd -G www-data,root -u $uid -d /home/$user $user
RUN mkdir -p /home/$user/.composer && \
    chown -R $user:$user /home/$user

# Set working directory
WORKDIR /var/www/eproject-backend

# Copy project files
COPY . /var/www/eproject-backend


RUN composer install --optimize-autoloader --no-dev
RUN chown -R $user:$user /var/www

# RUN mkdir -p /var/www/vendor \
#     && chown -R $user:$user /var/www

# Switch to the new user
USER $user

# Install composer dependencies
# RUN composer install --optimize-autoloader --no-dev

#Generate key
RUN php artisan key:generate
RUN php artisan storage:link
RUN php artisan optimize


# Start PHP-FPM
CMD ["php-fpm"]
