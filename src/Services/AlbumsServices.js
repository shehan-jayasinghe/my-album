import { fetchGet,jsonToQueryParam } from './CommonServiceUtils';

const BASE_URL = 'https://jsonplaceholder.typicode.com/';

const getAlbums = () => {
    return fetchGet(`${BASE_URL}/albums`)
};

const getAlbumsByUserId = ({userId}) => {
    return fetchGet(`${BASE_URL}albums?${jsonToQueryParam({userId})}`);
}

const getPhots= () => {
    return fetchGet(`${BASE_URL}photos`);
}

const getAlbumPhotosId = (albumId) => {
    return fetchGet(`${BASE_URL}photos?${jsonToQueryParam({albumId})}`);
}
export {
    getAlbums,
    getPhots,
    getAlbumPhotosId,
    getAlbumsByUserId,
};
