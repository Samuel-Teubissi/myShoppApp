# 1. Image de base PHP 8.0 + Apache
FROM php:8.0-apache

# 2. Installer les dépendances système puis les extensions PHP
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
    libonig-dev \
    libzip-dev \
    zip \
    unzip \
    libxml2-dev \
    default-mysql-client \
    && docker-php-ext-configure zip \
    && docker-php-ext-install \
    mbstring \
    mysqli \
    pdo_mysql \
    zip \
    xml \
    && rm -rf /var/lib/apt/lists/*

# 3. Activer mod_rewrite pour les URL propres CI3
RUN a2enmod rewrite

# 4. Autoriser les .htaccess (rewrite) dans Apache
RUN echo '<Directory /var/www/html/>\n\
    AllowOverride All\n\
    Require all granted\n\
    </Directory>' \
    > /etc/apache2/conf-available/override.conf \
    && a2enconf override

# 5. Copier ton backend CI3 (index.php, application/, system/, .htaccess…)
COPY . /var/www/html/

# 6. Droits d’accès pour Apache
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html

# 7. Exposer le port 80 et démarrer Apache
EXPOSE 80
CMD ["apache2-foreground"]
