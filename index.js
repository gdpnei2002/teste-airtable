import { AirTableConfig } from "@thinkam/typeairtable";

/// CONECTANDO NO AIRTABLE
  const instance = new AirTableConfig().configure({
    baseUrl: 'https://api.airtable.com/v0/appZTO7pz3nnDth21',
    apiKey: 'keyqh6DJ5HGdkhOoM',
  });

  const repository = instance.getRepository({
      tableName: 'tabelaTeste',
      columns: {
        name: 'singleText',
        ordem: 'number',
        isActived: 'checkBox',
      },
    });

/// CREATE (IGUAL TUTORIAL)
  const nameList = ['Caio', 'Felipe', 'neilson'];
  const idList = [];

  await Promise.all(
    await nameList.map(async (itemName, index) => {
      const resultCreated = await repository.create({
          name: itemName,
          ordem: index + 1,
          isActived: true,
      })
      idList.push(resultCreated.id)
    })
  );

/// DELETE (OS ITENS CRIADOS A NA LINHA 18)
  setTimeout(async () =>{
    await Promise.all(
      await idList.map(async (itemId) => {
        await repository.destroy(itemId);
      })
    );
  }, 20 * 1000)


/// CREATE
  await repository.create({
    name: 'your_name',
    ordem: 4,
    isActived: true,
  });

// READ
// SEGUE O LINK -> https://airtable.com/appZTO7pz3nnDth21/tblE8CFCu1iSznDn2/viwEdTGphVtHAurjm?blocks=hide

/// UPDATE
  await repository.update('recb2ysWlP4QIGghP', {
    name: 'othername',
    ordem: 4,
    isActived: true,
  });
  
/// DELETE
  await repository.destroy('your_id');

/// console.log
  const result = await repository.findAll({ orderBy: {ordem: 'asc'} })

  console.log(result)

