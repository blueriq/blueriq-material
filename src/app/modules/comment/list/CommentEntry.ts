export class CommentEntry {
  comment: string;
  date: Date;
  title: string;
  username: string;

  constructor(property: any) {
    this.comment = property['comment'];
    this.date = property['date'];
    this.title = property['title'];
    this.username = property['username'];
  }
}
