const TOKEN = "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";

const OWNER = "0Arash1386";
const REPO = "nikfood-menu";
const BRANCH = "main";
const FILE_PATH = "foods.json";

async function saveFoodsToGithub(foods){

    const api = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${FILE_PATH}`;

    const headers = {
        Authorization: `token ${TOKEN}`,
        Accept: "application/vnd.github+json"
    };

    // دریافت فایل فعلی
    const res = await fetch(api,{
        headers
    });

    const file = await res.json();

    const sha = file.sha;

    const content = btoa(
        unescape(
            encodeURIComponent(
                JSON.stringify(foods,null,2)
            )
        )
    );

    // بروزرسانی فایل
    const update = await fetch(api,{
        method:"PUT",
        headers:{
            ...headers,
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            message:"Update foods",
            content,
            sha,
            branch:BRANCH
        })
    });

    return await update.json();

}
