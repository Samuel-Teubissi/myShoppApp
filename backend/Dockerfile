# Utilise une image officielle avec Apache et PHP
FROM php:7.4-apache

# Installe les extensions nécessaires à CodeIgniter
RUN docker-php-ext-install mysqli pdo pdo_mysql && \
    docker-php-ext-enable mysqli pdo pdo_mysql

# Active mod_rewrite pour les URLs propres
RUN a2enmod rewrite

# Copie tous les fichiers du backend dans le dossier Apache
COPY . /var/www/html

# Change les droits pour éviter des erreurs de permission
RUN chown -R www-data:www-data /var/www/html && \
    chmod -R 755 /var/www/html

# Configure Apache pour CodeIgniter (si besoin)
# COPY ./000-default.conf /etc/apache2/sites-available/000-default.conf

# Expose le port 80 (celui utilisé par Apache)
EXPOSE 80

# Démarre Apache en foreground
CMD ["apache2-foreground"]
