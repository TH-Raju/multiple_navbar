/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: [
      "www.tubefilter.com",
      "encrypted-tbn0.gstatic.com",
      "helpx.adobe.com",
      "img.freepik.com",
      "i.pravatar.cc",
      "images.pexels.com",
      "via.placeholder.com",
      "res.cloudinary.com",
      "actor-file-bucket.s3.us-east-1.amazonaws.com",
      "kuratedservers3bucket.s3.amazonaws.com",
      "kuratedservers3bucket.s3-accelerate.amazonaws.com",
    ], // Add the domains you need
  },
};

export default nextConfig;
