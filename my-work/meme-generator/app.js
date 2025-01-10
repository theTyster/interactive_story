"use strict";

document.addEventListener("DOMContentLoaded", ()=>{
	//UTILITIES
	const select = (item)=> document.querySelector(item);
	const newElem = (tag)=> document.createElement(tag);

	//PAGE TAGS
	const page ={
		top: select("input[name='top-text']"),
		bottom: select("input[name='bottom-text']"),
		url: select("input[name='image-url']"),
		button: select("button"),
		can: select("canvas"),
	}

	//CANVAS DEFAULTS
	const ctx = page.can.getContext("2d");
	page.can.width = 302;
	page.can.height = 258;

	//EVENT HANDLERS
	const memeTextInsert = (textBool)=>{
		return ({isTop = textBool} = {})=>{
			let fontFillSize = page.can.height * .1;
			let fontStrokeSize = fontFillSize/20;
			const w = page.can.width;
			const h = page.can.height;
			let text;

			ctx.font = `900 ${fontFillSize}px Arial`;
			ctx.fillStyle = "white";
			ctx.strokeStyle = "black";
			ctx.lineWidth = fontStrokeSize;
			ctx.lineJoin = "round";
			ctx.textAlign = "center";

			if (isTop){
				ctx.clearRect(0,0, (w),(fontFillSize+10));
				text = page.top.value.toUpperCase();
				ctx.strokeText(text, (w/2),(fontFillSize-fontStrokeSize));
				ctx.fillText(text, (w/2),(fontFillSize-fontStrokeSize));
			}
			else{
				ctx.clearRect(0,(h - fontFillSize-10), w,h);
				text = page.bottom.value.toUpperCase();
				ctx.strokeText(text, (w/2),(h - (fontFillSize)/4));
				ctx.fillText(text, (w/2),(h - (fontFillSize)/4));
			}
		}
	}

	const imgLoad = async ()=>{
		const img = new Image();
		const errMsg = newElem("p");

		//STYLES
		errMsg.style.background = "darkred";
		errMsg.style.color = "white"
		errMsg.style.position = "absolute";
		errMsg.style.width = "100vw";
		errMsg.style.top = "100px";
		errMsg.style.left = 0;
		errMsg.style.padding = "20px";
		errMsg.style.textAlign = "center";
		errMsg.style.font = "900 20px Arial"
		errMsg.style.overflowWrap = "break-word";

		await new Promise((resolve, reject)=> {
			img.addEventListener("load", ()=>{
				resolve();
				if(img.height > 2000 || img.width > 800){
					errMsg.innerText = "That image is too large. Please use a smaller one.";
					select("body").append(errMsg);
					setTimeout(()=>errMsg.remove(), 5000);

					page.url.value = ""
					page.url.focus();
				}
				else{
					page.can.width = img.width;
					page.can.height = img.height;
					ctx.drawImage(img, 0,0);
				}
			})


			img.addEventListener("error", ()=>{
				reject();
				errMsg.innerText = "Unable to load the image."
				select("body").append(errMsg);
				setTimeout(()=>errMsg.remove(), 5000);
			})

			//LOAD THE IMAGE
			img.src = page.url.value;
		})
	}

	const createMeme = async (e)=>{
		e.preventDefault();
		let fontFillSize = page.can.height * .1;
		let fontStrokeSize = fontFillSize/20;
		const w = page.can.width;
		const h = page.can.height;
		const textTop = page.top.value.toUpperCase();
		const textBottom = page.bottom.value.toUpperCase();
		const galleryDiv = newElem("div");
		const gallery = newElem("canvas");
		const deleteButton = newElem("button");

		await imgLoad();

		//FONT STYLES
		ctx.font = `900 ${fontFillSize}px Arial`;
		ctx.fillStyle = "white";
		ctx.strokeStyle = "black";
		ctx.lineWidth = fontStrokeSize;
		ctx.textAlign = "center";

		//TOP TEXT
		ctx.strokeText(textTop, (w/2),(fontFillSize-fontStrokeSize));
		ctx.fillText(textTop, (w/2),(fontFillSize-fontStrokeSize));

		//BOTTOM TEXT
		ctx.strokeText(textBottom, (w/2),(h - (fontFillSize)/4));
		ctx.fillText(textBottom, (w/2),(h - (fontFillSize)/4));

		//MAKE GALLERY CANVAS
		galleryDiv.classList.add("gallery");
		select(".memes").prepend(galleryDiv);
		galleryDiv.append(gallery);
		const gtx = gallery.getContext("2d");
		const img = new Image();
		
		//MAKE THE DELETE BUTTON
		deleteButton.innerText = "Delete";
		deleteButton.classList.add("delete")
		gallery.after(deleteButton);
		deleteButton.addEventListener("click", deleteMeme);

		//COPY TEMPLATE TO GALLERY
		await new Promise((r)=>{
			img.addEventListener("load", ()=>{
				r();
				gallery.width = img.width;
				gallery.height = img.height;

				gtx.drawImage(img, 0,0);

				//FONT STYLES
				gtx.font = `900 ${fontFillSize}px Arial`;
				gtx.fillStyle = "white";
				gtx.strokeStyle = "black";
				gtx.lineWidth = fontStrokeSize;
				gtx.textAlign = "center";

				gtx.strokeText(textTop, (w/2),(fontFillSize-fontStrokeSize));
				gtx.fillText(textTop, (w/2),(fontFillSize-fontStrokeSize));

				gtx.strokeText(textBottom, (w/2),(h - (fontFillSize)/4));
				gtx.fillText(textBottom, (w/2),(h - (fontFillSize)/4));
				})

			//LOAD THE IMAGE
			img.src = page.url.value;

			})

		//CLEAR FIELDS
		page.top.value = "";
		page.bottom.value = "";
		page.url.value = "";
		ctx.clearRect(0,0, w,h);
		page.can.width = 302;
		page.can.height = 258;

	}

	const deleteMeme = (e)=>{
		e.target.parentElement.remove();
	}


	//EVENT LISTENERS
	page.top.addEventListener("keyup", memeTextInsert(true));
	page.bottom.addEventListener("keyup", memeTextInsert(false));
	page.url.addEventListener("keyup", imgLoad);
	page.button.addEventListener("click", createMeme);
});
