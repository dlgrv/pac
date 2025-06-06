// Конфигурация прокси-сервера
var useCustomProxy = true;        // true - использовать пользовательский прокси, false - системный прокси
var customProxyType = "SOCKS5";   // Тип прокси (например, "HTTP", "SOCKS5")
var customProxyIP = "127.0.0.1";  // IP-адрес пользовательского прокси
var customProxyPort = "1086";     // Порт пользовательского прокси
var systemProxy = "PROXY";        // Системный прокси (по умолчанию "PROXY")
var directConnection = "DIRECT";   // Прямое подключение

// Настройки для разблокировки сервисов
var unblockServices = {
    youtube: {
        domains: [
            "youtube.com", "ytimg.com", "youtu.be"
        ],
        patterns: [
            "*youtube.com/get_video_info*",
            "*youtube.com/api/timedtext*",
            "*youtube.com/watch*",
            "*redirector.googlevideo.com*",
            "*googlevideo.com*"
        ],
        allowedIPs: [] // IP-адреса, которые нужно использовать через прокси
    },
    discord: {
    domains: [
    ],
    patterns: [
            "*discord*",  // Шаблон для всех случаев, где есть слово "discord"
            "*dis.gd*"    // Шаблон для конкретного домена
        ],
    allowedIPs: [] // IP-адреса, которые нужно использовать через прокси
}
,
    twitter: {
        domains: [
            "twitter.com", "twimg.com", "t.co", "x.com"
        ],
        patterns: [],
        allowedIPs: [] // IP-адреса, которые нужно использовать через прокси
    },
    facebook: {
        domains: [
            "facebook.com", "fbcdn.net", "fb.com", "messenger.com"
        ],
        patterns: [],
        allowedIPs: [] // IP-адреса, которые нужно использовать через прокси
    },
    chatGpt: {
        domains: [
            "chatgpt.com",            // Основной домен ChatGPT
            "api.openai.com",         // API домен OpenAI
            "chat.openai.com",        // Домен ChatGPT в OpenAI
            "openai.com",             // Основной домен OpenAI
            "openaiapi.com",          // Дополнительный домен OpenAI API
            "platform.openai.com",    // Платформа OpenAI
            "stablediffusionweb.com", // Для связанного сервиса (если используется)
            "chat.com"
        ],
        patterns: [],
        allowedIPs: [] // IP-адреса, которые нужно использовать через прокси
    },
    instagram: {
        domains: [
            "instagram.com", "cdninstagram.com", "instagr.am"
        ],
        patterns: [
            "*instagram.com/*",    // Шаблон для всех запросов к Instagram
            "*cdninstagram.com/*", // Шаблон для всех запросов к CDN Instagram
            "*instagr.am/*"        // Шаблон для сокращенных ссылок Instagram
        ],
        allowedIPs: [] // IP-адреса, которые нужно использовать через прокси
    },
    aiogram: {
        domains: [
            "docs.aiogram.dev" // Домен документации aiogram
        ],
        patterns: [
            "*docs.aiogram.dev/*" // Шаблон для всех запросов к aiogram docs
        ],
        allowedIPs: [] // IP-адреса, которые нужно использовать через прокси
    },
    github: {
        domains: [
            "github.com",
            "gist.github.com",
            "githubusercontent.com"
        ],
        patterns: [
            "*github.com/*",
            "*gist.github.com/*",
            "*githubusercontent.com/*"
        ],
        allowedIPs: []
    },
    notion: {
        domains: [
            "notion.so",           // Основной домен Notion
            "notion-static.com",   // CDN для статических ресурсов
            "sentry.io"            // Для мониторинга ошибок
        ],
        patterns: [
            "*notion.so/*",         // Шаблон для всех запросов к Notion
            "*notion-static.com/*", // Шаблон для статических ресурсов
            "*sentry.io/*"          // Шаблон для запросов к Sentry
        ],
        allowedIPs: [] // IP-адреса, которые нужно использовать через прокси
    },
    soundcloud: {
        domains: [
            "soundcloud.com",      // Основной домен SoundCloud
            "sndcdn.com"           // Домен для статических ресурсов
        ],
        patterns: [
            "*soundcloud.com/*",   // Шаблон для всех запросов к SoundCloud
            "*sndcdn.com/*"        // Шаблон для всех запросов к CDN SoundCloud
        ],
        allowedIPs: [] // IP-адреса, которые нужно использовать через прокси
    },
    spotify: {
        domains: [
            "spotify.com",         // Основной домен
            "scdn.co",             // CDN для медиаконтента
            "spoti.fi"             // Сокращенные ссылки
        ],
        patterns: [
            "*spotify.com/*",      // Все поддомены и пути
            "*scdn.co/*",          // Контент и медиа
            "*spoti.fi/*"          // Сокращенные URL
        ],
        allowedIPs: [] // IP-адреса, которые нужно использовать через прокси
    },
    linkedin: {
        domains: [
            "linkedin.com",         // Основной домен
            "licdn.com",            // CDN для контента
            "linkedin.at",         // Дополнительные домены
            "lnkd.in"              // Сокращенные ссылки
        ],
        patterns: [
            "*linkedin.com/*",      // Все поддомены и пути
            "*licdn.com/*",         // Контент и медиа
            "*linkedin.at/*",       // Дополнительные пути
            "*lnkd.in/*"           // Сокращенные URL
        ],
        allowedIPs: [] // IP-адреса, которые нужно использовать через прокси
    },
    broadcom: {
        domains: [
            "broadcom.com"
        ],
        patterns: [
            "*broadcom.com/*"
        ],
        allowedIPs: []
    }
};

// Запрещенные IP-адреса
var blockedIPs = [
    // Добавьте блокированные IP-адреса здесь
];

// Частные сети, которые всегда идут напрямую
var privateNet = [
    ["10.0.0.0", "255.0.0.0"],
    ["172.16.0.0", "255.240.0.0"],
    ["192.168.0.0", "255.255.0.0"]
];

// Функция для получения прокси-строки на основе конфигурации
function getProxyConfig() {
    if (useCustomProxy) {
        return customProxyType + " " + customProxyIP + ":" + customProxyPort;
    } else {
        return systemProxy;
    }
}

// Проверка на частные сети
function isPrivateNetwork(host) {
    var ip4Re = /^(\d{1,3}\.){3}\d{1,3}$/;
    if (host.match(ip4Re)) {
        for (var i = 0; i < privateNet.length; i++) {
            if (isInNet(host, privateNet[i][0], privateNet[i][1])) {
                return true;
            }
        }
    }
    return false;
}

// Проверка на заблокированные IP
function isBlockedIP(host) {
    if (blockedIPs.indexOf(host) !== -1) {
        return true;
    }
    return false;
}

// Проверка на разрешенные IP для прокси
function isAllowedIP(host) {
    for (var service in unblockServices) {
        var serviceData = unblockServices[service];
        if (serviceData.allowedIPs.indexOf(host) !== -1) {
            return true;
        }
    }
    return false;
}

// Проверка доменов и шаблонов
function matchesServicePatterns(url, host) {
    for (var service in unblockServices) {
        var serviceData = unblockServices[service];
        
        // Проверка доменов
        for (var i = 0; i < serviceData.domains.length; i++) {
            if (dnsDomainIs(host, serviceData.domains[i]) || shExpMatch(host, "*." + serviceData.domains[i])) {
                return true;
            }
        }
        
        // Проверка URL-шаблонов
        for (var j = 0; j < serviceData.patterns.length; j++) {
            if (shExpMatch(url, serviceData.patterns[j])) {
                return true;
            }
        }
    }
    return false;
}

// Основная функция для определения прокси
function FindProxyForURL(url, host) {
    var proxy = getProxyConfig();  // Получаем конфигурацию прокси

    // Проверка на частные сети
    if (isPrivateNetwork(host)) {
        return directConnection;
    }

    // Проверка на заблокированные IP
    if (isBlockedIP(host)) {
        return directConnection; // Прямое соединение для заблокированных IP
    }

    // Проверка на разрешенные IP для прокси
    if (isAllowedIP(host)) {
        return proxy;
    }

    // Проверка доменов и шаблонов
    if (matchesServicePatterns(url, host)) {
        return proxy;
    }

    // Если ни одно условие не подошло - прямое соединение
    return directConnection;
}
