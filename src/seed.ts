import { database, User, Cat, Comment } from './models/database.js';

console.log("SEED DB PATH:", process.cwd());

async function seedComments(catId: number, userId: number, total: number) {
  for (let i = 1; i <= total; i++) {
    await Comment.create({
      catId,
      userId,
      testo: `Commento di prova #${i}`
    });
  }
  console.log(`Seeded ${total} comments for cat ${catId}`);
}




async function seed() {
  try {
    console.log('SEED AVVIATO');
    // Ricrea tutte le tabelle
    await database.sync({ force: true });

    // --- Users ---
    const u1 = await User.create({ userName: 'Giusy', email: 'giusy@example.com', password: '1234' });
    const u2 = await User.create({ userName: 'Mario', email: 'mario@example.com', password: '1234' });

    // --- Cat pages ---
const c1 = await Cat.create({titolo: 'Milo', descrizione: 'Era [persiano](https://www.google.com/search?q=gatto+persiano&sca_esv=51db692ab24d98dd&rlz=1C1ONGR_itIT1189IT1189&udm=2&biw=1707&bih=811&aic=0&sxsrf=ANbL-n5B3I74QI2O2hzBGNNsveWXQzkCYA%3A1770128006764&ei=hgKCacmoLqiO9u8Pke7K2AQ&oq=gatto+persi&gs_lp=Egtnd3Mtd2l6LWltZyILZ2F0dG8gcGVyc2kqAggAMggQABiABBixAzIFEAAYgAQyBRAAGIAEMggQABiABBixAzIFEAAYgAQyBRAAGIAEMgUQABiABDIFEAAYgAQyBRAAGIAEMgUQABiABEiRIVCNCFjaFXABeACQAQCYAaoBoAHTCqoBAzMuOLgBA8gBAPgBAZgCDKACkQuoAgrCAgoQIxgnGMkCGOoCwgIHECMYJxjJAsICCxAAGIAEGLEDGIMBwgIOEAAYgAQYsQMYgwEYigXCAgoQABiABBhDGIoFwgINEAAYgAQYsQMYQxiKBZgDEZIHAzMuOaAHlUWyBwMyLjm4B4ALwgcHMC44LjMuMcgHLoAIAA&sclient=gws-wiz-img)', 
                              foto: 'gatto_default.jpg', lat: 45.4642, lng: 9.1900, userId: u1.getDataValue('id')});
const c2 = await Cat.create({titolo: 'Luna', descrizione: 'Gatta *elegante*', foto: 'gatto_default.jpg', lat: 41.9028, lng: 12.4964, userId: u1.getDataValue('id')});
const c3 = await Cat.create({titolo: 'Simba', descrizione: '**S T U P E N D O**', foto: 'gatto_default.jpg', lat: 40.8518, lng: 14.2681, userId: u2.getDataValue('id')});

    // --- Comments ---
    await Comment.create({ testo: 'Che bel gatto!', userId: u1.getDataValue('id'), catId: c1.getDataValue('id') });
    await Comment.create({ testo: 'Meraviglioso!', userId: u2.getDataValue('id'), catId: c2.getDataValue('id') });
    await Comment.create({ testo: 'Dolcissimo!', userId: u2.getDataValue('id'), catId: c3.getDataValue('id') });
    await seedComments(1, 1, 50); 

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (err: any) {
    console.error("Error seeding database:", err.message);
    process.exit(1);
  }
}

seed();
