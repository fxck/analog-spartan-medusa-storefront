import { IMAGE_LOADER, ImageLoaderConfig } from '@angular/common';
import Imgproxy from '../util/imgproxy';

const imgproxy = new Imgproxy({
  baseUrl: import.meta.env['IMGPROXY_URL'],
  key: import.meta.env['IMGPROXY_KEY'],
  salt: import.meta.env['IMGPROXY_SALT'],
  encode: true
});

export function provideImgproxyLoader() {
  return {
    provide: IMAGE_LOADER,
    useValue: ({ src, width, loaderParams }: ImageLoaderConfig) => {

      if (!import.meta.env['IMGPROXY_KEY'] || !import.meta.env['IMGPROXY_SALT']) {
        console.warn('IMGPROXY_KEY or IMGPROXY_SALT not set');
        return src;
      }

      try {
        const sourceUrl = src.startsWith('http')
          ? src
          : `${import.meta.env['VITE_PUBLIC_BASE_URL']}${src}`;

        const processedUrl = imgproxy
          .builder()
          .resize('fill', width || 800, width || 800, false)
          .quality(loaderParams?.['quality'] || 50)
          .generateUrl(sourceUrl);

        return processedUrl;
      } catch (error) {
        console.error('Error generating imgproxy URL:', error);
        return src;
      }

    }
  };
}


