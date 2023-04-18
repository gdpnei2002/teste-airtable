import { AirTableConfig } from "@thinkam/typeairtable";

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

  const nameList = ['Caio', 'Felipe'];
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

  setTimeout(async () =>{
    await Promise.all(
      await idList.map(async (itemId) => {
        await repository.destroy(itemId);
      })
    );
  }, 20 * 1000)

  const result = await repository.findAll({ orderBy: {ordem: 'asc'} })

  console.log(result)
