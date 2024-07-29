import { Book } from "./definitions";

const books: Book[] = [];

function getRandomName() {
  const titles = [
    "The Silent Patient",
    "The Great Gatsby",
    "To Kill a Mockingbird",
    "1984",
    "The Catcher in the Rye",
    "Pride and Prejudice",
    "The Hobbit",
    "Harry Potter and the Sorcerer's Stone",
    "The Lord of the Rings",
    "The Da Vinci Code",
    "Moby Dick",
    "War and Peace",
    "Anna Karenina",
    "The Adventures of Sherlock Holmes",
    "Gone with the Wind",
    "The Picture of Dorian Gray",
    "The Shining",
    "The Alchemist",
    "A Tale of Two Cities",
    "The Brothers Karamazov",
    "Crime and Punishment",
    "Jane Eyre",
    "Wuthering Heights",
    "Brave New World",
    "Les Misérables",
    "The Odyssey",
    "Ulysses",
    "The Divine Comedy",
    "Don Quixote",
    "The Iliad",
  ];
  return titles[Math.floor(Math.random() * titles.length)];
}

function getRandomImgUrl() {
  const titles = [
    "https://d29xot63vimef3.cloudfront.net/image/iron-man/57-1.jpg",
    "https://w0.peakpx.com/wallpaper/987/659/HD-wallpaper-the-flash-comics-covers-dc.jpg",
    "https://wallpapercave.com/wp/wp5590438.jpg",
    "https://cdna.artstation.com/p/assets/images/images/013/801/940/large/ezequiel-schapira-daredevil-cover.jpg?1541147561",
    "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj4mrxfBP6W_c50dPNlDuvbAmOAb50NaPhPoGLek2OHfouzd8WJCCFISaDjSVTnwcgmF2mR3YLAgBKGy1bIC9c86B0HmFUFpKb45HoW-T8mqCyDFPqGDJLsmUagkzLG4CblShMdXr7Cpto/s1600/DD20.jpg",
    "https://i.pinimg.com/474x/8b/d7/b1/8bd7b1aac7f0c10058ef0bc302f2c601.jpg",
    "https://www.coverbrowser.com/image/x-men/11-1.jpg",
  ];
  return titles[Math.floor(Math.random() * titles.length)];
}

function getRandomAuthor() {
  const authors = [
    "David Baldacci",
    "Stephen King",
    "Jeffrey Archer",
    "Leo Tolstoy",
    "James Patterson",
    "J. K. Rowling",
    "George Orwell",
    "Jane Austen",
    "J.R.R. Tolkien",
    "Dan Brown",
    "Herman Melville",
    "Fyodor Dostoevsky",
    "Oscar Wilde",
    "Mark Twain",
    "Charles Dickens",
  ];
  return authors[Math.floor(Math.random() * authors.length)];
}

export const categoriesOptions = [
  { value: null, label: "All" },
  { value: "Fiction", label: "Fiction" },
  { value: "Non-Fiction", label: "Non-Fiction" },
  { value: "Fantasy", label: "Fantasy" },
  { value: "Science Fiction", label: "Science Fiction" },
  { value: "Mystery", label: "Mystery" },
  { value: "Thriller", label: "Thriller" },
  { value: "Romance", label: "Romance" },
  { value: "Historical", label: "Historical" },
];

function getRandomCategory() {
  const categories = [
    "Fiction",
    "Non-Fiction",
    "Fantasy",
    "Science Fiction",
    "Mystery",
    "Thriller",
    "Romance",
    "Historical",
  ];
  return categories[Math.floor(Math.random() * categories.length)];
}

function getRandomPrice() {
  return Math.floor(Math.random() * 50) + 10;
}

function getRandomQuantity() {
  return Math.floor(Math.random() * 100) + 1;
}

for (let i = 1; i <= 50; i++) {
  books.push({
    id: i,
    name: getRandomName(),
    author: getRandomAuthor(),
    category: getRandomCategory(),
    price: getRandomPrice(),
    quantity: getRandomQuantity(),
    imgUrl: getRandomImgUrl(),
  });
}

export default books;
