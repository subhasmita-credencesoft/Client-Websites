import RoomsGalleryStrip from '@/components/sections/shared/RoomsGalleryStrip';
import { banquetGallery } from '@/data/pages/banquet';

export default function BanquetGallery() {
  return <RoomsGalleryStrip images={banquetGallery} />;
}
