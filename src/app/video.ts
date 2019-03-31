export class Video {

  videoId: number;
  externalVideoId: string;
  title: string;
  views: string | number;
  likes: string | number;
  imgUrl: string;
  videoUrl: string;
  favourite: boolean;
  addingDate: string;

 constructor(innerId: number, externalId: string, title: string, views: number | string, likes: number | string, imgUrl: string, videoUrl: string, favourite: boolean) {
   this.videoId = innerId;
   this.externalVideoId = externalId;
   this.title = title;
   this.views = views;
   this.likes =  likes;
   this.imgUrl =  imgUrl;
   this.videoUrl = videoUrl;
   this.favourite = favourite;
   this.addingDate = Video.getTodayDate()
 }

  static getTodayDate() {
    const today = new Date();
    const dd = today.getDate();
    const mm = today.getMonth() + 1;
    const yyyy = today.getFullYear();
    return dd + '/' + mm + '/' + yyyy;
  }
}
