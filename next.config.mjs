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

      // "kuratedservers3bucket.s3-accelerate.amazonaws.com",
      "https://kuratedservers3bucket.s3-accelerate.amazonaws.com/1729777582385_Screenshot%202024-10-24%20at%209.45.38%C3%A2%C2%80%C2%AFAM.png",
    ], // Add the domains you need

    remotePatterns: [
      {
        protocol: "https",
        hostname: "kuratedservers3bucket.s3-accelerate.amazonaws.com",
        pathname: "/**", // Match all paths
      },
    ],
  },
};

export default nextConfig;
