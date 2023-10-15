import { createBucketClient } from "@cosmicjs/sdk";
import { PUBLIC_COSMIC_BUCKET_SLUG, PUBLIC_COSMIC_READ_KEY } from "@/lib/environment.ts";

export interface Post {
    slug: string;
    title: string;
    metadata: Metadata;
}

interface Metadata {
    project_description_en: string;
    project_description_es: string;
    cover_image: CoverImage;
}

interface CoverImage {
    url: string;
    imgix_url: string;
}

class CosmicJS {
    private cosmic = createBucketClient({
        bucketSlug: PUBLIC_COSMIC_BUCKET_SLUG,
        readKey: PUBLIC_COSMIC_READ_KEY,
    });

    public async getPosts() {
        const posts = await this.cosmic.objects
            .find({ type: "posts" })
            .props("slug,title,metadata")
            .depth(1);

        return posts.objects;
    }

    public async getPost(slug: string) {
        const post = await this.cosmic.objects
            .findOne({ type: "posts", slug })
            .props("slug,title,metadata")
            .depth(1);
        return post.object;
    }
}

export default CosmicJS;
