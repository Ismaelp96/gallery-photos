import Button from '../components/button';
import Container from '../components/container';
import ImagePreview from '../components/image-preview';
import Skeleton from '../components/skeleton';
import Text from '../components/text';
import PhotosNavigator from '../contexts/photos/components/photos-navigator';
import type { Photo } from '../contexts/photos/models/photo';

export function PagePhotoDetails() {
	const isLoadingPhoto = false;
	const photo = {} as Photo;
	return (
		<Container>
			<header className='flex items-center justify-between gap-8 mb-8'>
				{isLoadingPhoto ? (
					<Text variant='heading-large'>{photo?.title}</Text>
				) : (
					<Skeleton className='w-48 h8' />
				)}
				<PhotosNavigator />
			</header>
			<div className='grid grid-cols-[21rem] gap-24'>
				{!isLoadingPhoto ? (
					<div className='space-y-3'>
						<ImagePreview
							src={`images/${photo?.imageId}`}
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
			</div>
		</Container>
	);
}
