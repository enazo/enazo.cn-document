import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, rmdirSync, rmSync, statSync, writeFileSync } from 'fs';
import markdownit from 'markdown-it'
const md = markdownit()


const buildPath = 'build/';



// 删除 build 目录

if(existsSync(buildPath)){
	rmSync(buildPath, { recursive: true });
}

// 创建 build 目录
mkdirSync(buildPath, { recursive: true });

// 递归复制 public 目录下所有文件 到 build 目录
const copyFiles = (dir) => {
	const fileNames = readdirSync(dir);

	for(const fileName of fileNames){
		const filePath = `${dir}/${fileName}`;
		const copyPath = `${buildPath}/${filePath.replace('_public/', '')}`;
		const stat = statSync(filePath);

		if(stat.isDirectory()){
			mkdirSync(copyPath, { recursive: true });
			copyFiles(filePath);
		}else{
			copyFileSync(filePath, copyPath);
		}
	}
}

copyFiles('_public');


// 递归获取 _src 目录下所有层级的 markdown 文件

const getMarkdownFiles = (dir) => {
	const fileNames = readdirSync(dir);
	const markdownFiles = [];

	for(const fileName of fileNames){

		if(/node_/.test(fileName))
			continue;
		
		const filePath = `${dir}/${fileName}`.replace(/.\/\//g, '');
		const stat = statSync(filePath);

		if(stat.isDirectory()){
			markdownFiles.push(...getMarkdownFiles(filePath));
		}else if(fileName.endsWith('.md')){
			markdownFiles.push(filePath);
		}
	}

	return markdownFiles;
}

const markdownFiles = getMarkdownFiles('./');

console.log(markdownFiles);


// 读取 markdown 文件内容，转换为 html，写入 build 目录
for(const markdownFile of markdownFiles){
	const html = md.render(readFileSync(markdownFile, 'utf8'));
	const htmlFile = buildPath + markdownFile.replace('_src/', buildPath).replace('.md', '.html');

	// 创建目录
	const dir = htmlFile.replace(/\/[^/]+$/, '');

	if(!existsSync(dir)){
		mkdirSync(dir, { recursive: true });
	}

	writeFileSync(htmlFile, html);
}