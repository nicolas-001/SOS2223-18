var njoAPI = [
    {
        "province": "Almeria",
        "gender": "Hombres",
        "age": 20,
        "period": 2021,
        "asset_thousand": 13.2,
        "tax":38.3
    },
    {
      "province": "Almeria",
      "gender": "Hombres",
      "age": 30,
      "period": 2021,
      "asset_thousand": 40.1,
      "tax":90.6
    },
    {
        "Province": "Almeria",
        "Month": "Marzo",
        "immigrant": 4014,
        "emigrant": 4562,
        "total": 8576
    },
    {
        "Province": "Almeria",
        "Month": "Abril",
        "immigrant": 3403,
        "emigrant": 2815,
        "total": 6218
    }
    
  ];
  

exports.objectReport = function(req, res) {
    const objectProvince = req.params.province;
    // lógica para borrar el informe correspondiente al mes especificado
    res.send(`El informe correspondiente a la provincia ${objectProvince} ha sido eliminado correctamente.`);
    res.json(njoAPI);
}