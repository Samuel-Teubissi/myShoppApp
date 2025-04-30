# Utilise une image PHP avec Apache
FROM php:7.4-apache

# Installe les extensions nécessaires pour CodeIgniter
RUN docker-php-ext-install mysqli pdo pdo_mysql

# Active le module Apache pour les URL propres
RUN a2enmod rewrite

# Copie le projet dans le dossier du serveur
RUN echo "Listing current dir:" && ls -al
COPY . /var/www/html/

# Donne les bons droits d’accès
RUN chown -R www-data:www-data /var/www/html && chmod -R 755 /var/www/html

# Optionnel : si ton index.php est dans un sous-dossier (comme public)
# ENV APACHE_DOCUMENT_ROOT /var/www/html/public
