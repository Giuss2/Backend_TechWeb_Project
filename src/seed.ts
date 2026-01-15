import { database, User, Cat, Comment } from './models/database.js';

console.log("SEED DB PATH:", process.cwd());

async function seed() {
  try {
    console.log('SEED AVVIATO');
    // Ricrea tutte le tabelle
    await database.sync({ force: true });

    // --- Users ---
    const u1 = await User.create({ userName: 'Giusy', email: 'giusy@example.com', password: '1234' });
    const u2 = await User.create({ userName: 'Mario', email: 'mario@example.com', password: '1234' });

    // --- Cat pages ---
const c1 = await Cat.create({titolo: 'Milo', descrizione: 'Gattino carino', foto: 'gatto_default.jpg', lat: 45.4642, lng: 9.1900, userId: u1.getDataValue('id')});
const c2 = await Cat.create({titolo: 'Luna', descrizione: 'Gatta curiosa', foto: 'gatto_default.jpg', lat: 41.9028, lng: 12.4964, userId: u1.getDataValue('id')});
const c3 = await Cat.create({titolo: 'Simba', descrizione: 'Re della casa', foto: 'gatto_default.jpg', lat: 40.8518, lng: 14.2681, userId: u2.getDataValue('id')});

    // --- Comments ---
    await Comment.create({ testo: 'Che bel gatto!', userId: u1.getDataValue('id'), catId: c1.getDataValue('id') });
    await Comment.create({ testo: 'Meraviglioso!', userId: u2.getDataValue('id'), catId: c2.getDataValue('id') });
    await Comment.create({ testo: 'Dolcissimo!', userId: u2.getDataValue('id'), catId: c3.getDataValue('id') });

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (err: any) {
    console.error("Error seeding database:", err.message);
    process.exit(1);
  }
}

seed();
