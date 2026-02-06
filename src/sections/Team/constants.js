import Placeholder from '../../assets/team/placeholder.webp';

const images = import.meta.glob('../../assets/team/*.webp', {
    eager: true,
    import: 'default',
});
  
const teamPhotos = Object.fromEntries(
    Object.entries(images).map(([path, src]) => {
      const key = path.split('/').pop().replace('.webp', '');
      return [key.toLowerCase(), src];
    })
);

export const getTeamPhoto = (imgKey) =>
  teamPhotos[imgKey] || Placeholder;
