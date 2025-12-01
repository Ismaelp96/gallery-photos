import type React from 'react';

import SelectCheckbox from '../../../assets/images/select-checkbox.svg?react';
import type { Photo } from '../../photos/models/photo';

import {
	Dialog,
	DialogBody,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTrigger,
} from '../../../components/dialog';
import InputText from '../../../components/input-text';
import Button from '../../../components/button';
import Text from '../../../components/text';
import Skeleton from '../../../components/skeleton';
import PhotoImageSelectable from '../../photos/components/photo-image-selectable';

interface PhotoNewDialogProps {
	trigger: React.ReactNode;
}

export default function AlbumNewDialog({ trigger }: PhotoNewDialogProps) {
	const isLoadingPhotos = false;

	const photos: Photo[] = [
		{
			id: '123',
			title: 'Olá mundo!',
			imageId: 'portrait-tower.png',
			albums: [],
		},
		{
			id: '123',
			title: 'Olá mundo!',
			imageId: 'portrait-tower.png',
			albums: [],
		},
	];

	function handleTogglePhoto(selected: boolean, photoId: string) {
		console.log(selected, photoId);
	}
	return (
		<Dialog>
			<DialogTrigger asChild>{trigger}</DialogTrigger>
			<DialogContent>
				<DialogHeader>Criar álbum</DialogHeader>
				<DialogBody className='flex flex-col gap-5'>
					<InputText placeholder='Adicione um título' />
					<div className='flex flex-col gap-3'>
						<Text variant='label-small'>Fotos cadastradas</Text>

						{!isLoadingPhotos && photos.length > 0 && (
							<div className='flex items-center gap-3 flex-wrap'>
								{photos.map((photo) => (
									<PhotoImageSelectable
										key={photo.id}
										src={`/images/${photo.imageId}`}
										title={photo.title}
										imageClassName='w-21 h-21'
										onSelectImage={(selected) =>
											handleTogglePhoto(selected, photo.id)
										}
									/>
								))}
							</div>
						)}

						{isLoadingPhotos && (
							<div className='flex items-center gap-3 flex-wrap'>
								{Array.from({ length: 4 }).map((_, i) => (
									<Skeleton
										className='h-21 w-21 rounded-lg'
										key={`photo-loading-${i}`}
									/>
								))}
							</div>
						)}
						{!isLoadingPhotos && photos.length === 0 && (
							<div className='w-full flex flex-col justify-center items-center gap-3 pb-2'>
								<SelectCheckbox />
								<Text variant='paragraph-medium' className='text-center'>
									Nenhuma foto disponível para seleção
								</Text>
							</div>
						)}
					</div>
				</DialogBody>
				<DialogFooter>
					<DialogClose asChild>
						<Button variant='secondary'>Cancelar</Button>
					</DialogClose>
					<Button type='submit'>Criar</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
