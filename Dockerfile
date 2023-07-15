# Use uma imagem base adequada para o seu aplicativo
FROM node:14

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie o arquivo package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instale as dependências do aplicativo
RUN npm ci --only=production

# Copie o restante dos arquivos do aplicativo para o diretório de trabalho
COPY . .

# Exponha a porta em que o aplicativo está ouvir
EXPOSE 8080

# Defina o comando para iniciar o aplicativo
CMD [ "yarn", "start" ]
