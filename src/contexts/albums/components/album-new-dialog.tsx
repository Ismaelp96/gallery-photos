import { useEffect, useState } from 'react';

import SelectCheckbox from '../../../assets/images/select-checkbox.svg?react';
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
import usePhotos from '../../photos/hooks/use-photos';
import { url } from '../../../helpers/api';
import { useForm } from 'react-hook-form';
import { albumNewFormSchema, type AlbumNewFormSchema } from '../schemas';
import { zodResolver } from '@hookform/resolvers/zod';

interface PhotoNewDialogProps {
	trigger: React.ReactNode;
}

export default function AlbumNewDialog({ trigger }: PhotoNewDialogProps) {
	const [modalOpen, setModalOpen] = useState(false);

	const form = useForm<AlbumNewFormSchema>({
		resolver: zodResolver(albumNewFormSchema),
	});
	const { photos, isLoadingPhotos } = usePhotos();

	useEffect(() => {
		if (!modalOpen) {
			form.reset();
		}
	}, [modalOpen, form]);

	function handleTogglePhoto(selected: boolean, photoId: string) {
		const photosIds = form.getValues('photosIds') || [];
		let newValue = [];

		if (selected) {
			newValue = [...photosIds, photoId];
		} else {
			newValue = photosIds.filter((id) => id !== photoId);
		}

		form.setValue('photosIds', newValue);
	}

	function heandleSubmit(payload: AlbumNewFormSchema) {
		console.log(payload);
	}
	return (
		<Dialog open={modalOpen} onOpenChange={setModalOpen}>
			<DialogTrigger asChild>{trigger}</DialogTrigger>
			<DialogContent>
				<form onSubmit={form.handleSubmit(heandleSubmit)}>
					<DialogHeader>Criar álbum</DialogHeader>
					<DialogBody className='flex flex-col gap-5'>
						<InputText
							placeholder='Adicione um título'
							error={form.formState.errors.title?.message}
							{...form.register('title')}
						/>
						<div className='flex flex-col gap-3'>
							<Text variant='label-small'>Fotos cadastradas</Text>
							{!isLoadingPhotos && photos.length > 0 && (
								<div className='flex items-center gap-3 flex-wrap'>
									{photos.map((photo) => (
										<PhotoImageSelectable
											key={photo.id}
											src={`${url}/${photo.imageId}`}
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
				</form>
			</DialogContent>
		</Dialog>
	);
}
