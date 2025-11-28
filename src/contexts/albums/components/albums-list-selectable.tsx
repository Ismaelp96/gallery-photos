import type React from 'react';

import type { Album } from '../models/album';
import type { Photo } from '../../photos/models/photo';
import cx from 'classnames';
import Text from '../../../components/text';
import InputCheckbox from '../../../components/input-checkbox';
import Divider from '../../../components/divider';
import Skeleton from '../../../components/skeleton';

interface AlbumsListSelectableProps extends React.ComponentProps<'ul'> {
	loading?: boolean;
	albums: Album[];
	photo: Photo;
}
export default function AlbumsListSelectable({
	loading,
	albums,
	photo,
	className,
	...props
}: AlbumsListSelectableProps) {
	function isChecked(albumId: string) {
		return photo?.albums?.some((album) => album.id === albumId);
	}

	function handlePhotoOnAlbum(albumId: string) {
		let albumIds = [];

		if (isChecked(albumId)) {
			albumIds = photo?.albums
				?.filter((album) => album.id !== albumId)
				.map((album) => album.id);
		} else {
			albumIds = [...photo.albums.map((album) => album.id, albumId)];
		}

		console.log(
			'Essses são os albums que vamos enviar para o backend',
			albumIds,
		);
		return albumIds;
	}
	return (
		<ul className={cx('flex flex-col gap-4', className)} {...props}>
			{!loading &&
				albums?.length > 0 &&
				albums.map((album, index) => (
					<li key={album.id}>
						<div className='flex items-center justify-between'>
							<Text>{album.title}</Text>
							<InputCheckbox
								defaultChecked={isChecked(album.id)}
								onClick={() => handlePhotoOnAlbum(album.id)}
							/>
						</div>
						{index !== albums.length - 1 && <Divider className='mt-4' />}
					</li>
				))}
			{loading &&
				Array.from({ length: 4 }).map((_, i) => (
					<li key={`album-list-loading-${i}`}>
						<Skeleton className='h-[2.5rem]' />
					</li>
				))}
		</ul>
	);
}
