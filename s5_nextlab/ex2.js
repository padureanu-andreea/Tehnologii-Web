import fs from 'fs'

fs.mkdirSync('test_folder')
console.log('Director creat: test_folder')

fs.writeFileSync('test_folder/fisier.txt', 'Salut, acesta este un test!')
console.log('Fisier creat: test_folder/fisier.txt')

fs.rmSync('test_folder', { recursive: true })
console.log('Director sters: test_folder')