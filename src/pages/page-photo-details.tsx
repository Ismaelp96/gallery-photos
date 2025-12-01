import useAlbums from '../contexts/albums/hooks/use-albums';
import type { Photo } from '../contexts/photos/models/photo';

import Button from '../components/button';
import Container from '../components/container';
import ImagePreview from '../components/image-preview';
import Skeleton from '../components/skeleton';
import Text from '../components/text';
import AlbumsListSelectable from '../contexts/albums/components/albums-list-selectable';
import PhotosNavigator from '../contexts/photos/components/photos-navigator';

export function PagePhotoDetails() {
	const { albums, isLoadingAlbums } = useAlbums();

	const isLoadingPhoto = false;

	const photo = {
		id: '123',
		title: 'Olá mundo!',
		imageId: 'portrait-tower.png',
		albums: [
			{ id: '3421', title: 'Esportes' },
			{ id: '1234', title: 'Natureza' },
			{ id: '4132', title: 'Geométrico' },
		],
	} as Photo;
	return (
		<Container>
			<header className='flex items-center justify-between gap-8 mb-8'>
				{isLoadingPhoto ? (
					<Text as='h2' variant='heading-large'>
						{photo?.title}
					</Text>
				) : (
					<Skeleton className='w-48 h8' />
				)}
				<PhotosNavigator />
			</header>
			<div className='grid grid-cols-[21rem_1fr] gap-24'>
				{!isLoadingPhoto ? (
					<div className='space-y-3'>
						<ImagePreview
							src={`/images/${photo.imageId}`}
							title={photo?.title}
							imageClassName='h-[21rem]'
						/>
						<Button variant='destructive'>Excluir</Button>
					</div>
				) : (
					<div className='space-y-3'>
						<Skeleton className='h-[21rem]' />
						<Skeleton className='w-20 h-10' />
					</div>
				)}
				<div className='py-3'>
					<Text as='h3' variant='heading-medium' className='mb-6'>
						Álbuns
					</Text>
					<AlbumsListSelectable
						photo={photo}
						albums={albums}
						loading={isLoadingAlbums}
					/>
				</div>
			</div>
		</Container>
	);
}
