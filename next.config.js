/**
 * Konfiguracja Next.js
 * Definiuje ustawienia dla:
 * - Obsługi obrazów
 * - Konfiguracji TypeScript
 * - Ustawień eksperymentalnych
 * - Konfiguracji webpacka
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Konfiguracja obsługi obrazów zewnętrznych
  images: {
    // Zezwala na obrazy z dowolnych hostów HTTPS
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*',
      },
    ],
    // Dodatkowa domena dla Cloudinary
    domains: ['res.cloudinary.com'],
  },

  // Ignorowanie błędów TypeScript podczas budowania
  typescript: {
    ignoreBuildErrors: true,
  },

  // Ustawienia eksperymentalne
  experimental: {
    // Dynamiczna liczba workerów bazująca na dostępnej pamięci
    memoryBasedWorkersCount: true,
  },

  // Konfiguracja webpacka
  webpack: (config) => {
    // Ustawienia watchera dla lepszej wydajności w developmencie
    config.watchOptions = {
      poll: 1000, // Sprawdzanie zmian co 1 sekundę
      aggregateTimeout: 300, // Opóźnienie przed rebuildem
    }
    return config
  },
}

module.exports = nextConfig 
