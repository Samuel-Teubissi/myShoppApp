# Utilise une image officielle avec Apache et PHP
FROM php:7.4-apache

# Installe les extensions nécessaires à CodeIgniter
RUN docker-php-ext-install pdo pdo_mysql mysqli

# Active mod_rewrite pour les URLs propres
RUN a2enmod rewrite
RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf

# Copie tous les fichiers du backend dans le dossier Apache
COPY . /var/www/html

# Change les droits pour éviter des erreurs de permission
RUN chown -R www-data:www-data /var/www/html

# Configure Apache pour CodeIgniter (si besoin)
# COPY ./000-default.conf /etc/apache2/sites-available/000-default.conf

# Expose le port 80 (celui utilisé par Apache)
EXPOSE 80

