ARG PHP_VERSION=8.4

FROM php:${PHP_VERSION}-fpm-alpine

WORKDIR /var/www/html
RUN apk add --no-cache \
        git \
        libzip \
        curl \
        nodejs \
        npm \
        unzip \
    && apk add --no-cache --virtual .build-deps \
        $PHPIZE_DEPS \
        icu-dev \
        libzip-dev \
    && docker-php-ext-install -j"$(nproc)" \
        bcmath \
        intl \
        opcache \
        pcntl \
        pdo_mysql \
        zip \
    && apk del .build-deps

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

CMD ["php-fpm", "-F"]
