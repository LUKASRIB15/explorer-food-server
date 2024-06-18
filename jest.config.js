module.exports ={
  bail: true, // Se um teste falhar, todos os testes vão parar e vai mostrar os erros,
  coverageProvider: "v8",

  testMatch: [
    "<rootDir>/src/**/__tests__/*.spec.js", // Eles ignoram qualquer arquivo que não tenha a extensão .spec.js
  ]
}