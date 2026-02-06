import Placeholder from '../../assets/team/group/placeholder.webp';

const images = import.meta.glob('../../assets/team/group/*.webp', {
    eager: true,
    import: 'default',
});
  
const groupPhotos = Object.fromEntries(
    Object.entries(images).map(([path, src]) => {
      const key = path.split('/').pop().replace('.webp', '');
      return [key.toLowerCase(), src];
    })
);

export const getGroupPhotos = (imgKey) =>
    groupPhotos[imgKey] || Placeholder;
