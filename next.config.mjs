const nextConfig = {
  allowedDevOrigins: ['10.111.227.252', '10.111.227.252:3000'],
};

export default nextConfig;

import('@opennextjs/cloudflare').then(m => m.initOpenNextCloudflareForDev());
