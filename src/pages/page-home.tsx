import Container from '../components/container';
import AlbumsFilter from '../contexts/albums/components/albums-filter';
import useAlbums from '../contexts/albums/hooks/use-albums';
import PhotosList from '../contexts/photos/components/photo-list';

export function PageHome() {
	const { albums, isLoadingAlbums } = useAlbums();
	return (
		<Container>
			<AlbumsFilter
				albums={albums}
				loading={isLoadingAlbums}
				className='mb-9'
			/>
			<PhotosList
				photos={[
					{
						id: '123',
						title: 'Olá mundo!',
						imageId: 'portrait-tower.png',
						albums: [
							{ id: '3421', title: 'Esportes' },
							{ id: '1234', title: 'Natureza' },
							{ id: '4132', title: 'Geométrico' },
						],
					},
					{
						id: '123',
						title: 'Olá mundo!',
						imageId: 'portrait-tower.png',
						albums: [
							{ id: '3421', title: 'Esportes' },
							{ id: '1234', title: 'Natureza' },
							{ id: '4132', title: 'Geométrico' },
						],
					},
					{
						id: '123',
						title: 'Olá mundo!',
						imageId: 'portrait-tower.png',
						albums: [
							{ id: '3421', title: 'Esportes' },
							{ id: '1234', title: 'Natureza' },
							{ id: '4132', title: 'Geométrico' },
						],
					},
					{
						id: '123',
						title: 'Olá mundo!',
						imageId: 'portrait-tower.png',
						albums: [
							{ id: '3421', title: 'Esportes' },
							{ id: '1234', title: 'Natureza' },
							{ id: '4132', title: 'Geométrico' },
						],
					},
					{
						id: '123',
						title: 'Olá mundo!',
						imageId: 'portrait-tower.png',
						albums: [
							{ id: '3421', title: 'Esportes' },
							{ id: '1234', title: 'Natureza' },
							{ id: '4132', title: 'Geométrico' },
						],
					},
				]}
			/>
		</Container>
	);
}
