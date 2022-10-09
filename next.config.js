//  @type {import('next').NextConfig}
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "backend.keepup.com.au",
      "images.unsplash.com",
      "medias.lequipe.fr",
      "www.afrik-foot.com",
      "images.6play.fr",
      "i.la-croix.com",
      "www.foot01.com",
      "d107a8nc3g2c4h.cloudfront.net",
      "sportbusiness.club",
      "assets-fr.imgfoot.com",
      "i1.wp.com",
      "www.leparisien.fr",
    ],
  },
};

module.exports = nextConfig;
