export class ApiEndpoints{

    static GENRE_LIST: string = '/genre/movie/list?language=es-MX';

    static getMoviesByGenre(id : number, page: number) : string{
        return `/discover/movie?with_genres=${id.toString()}&language=es-MX&page=${ page.toString() }`;
    }

    static getTrendingMovies(page: number) : string {
        return `/trending/all/day?language=es-MX&page=${ page.toString() }`;
    } 

    static getImage (path : string){
        return `https://image.tmdb.org/t/p/original${ path }`;
    }

}