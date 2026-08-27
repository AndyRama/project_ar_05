import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getStorageUsage } from "@/lib/files/storage-usage";
import { LargestFilesList } from "./largest-files-list";

export const LargestFilesCard = async () => {
  const usage = await getStorageUsage();

  if (usage.largestFiles.length === 0) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">Fichiers les plus volumineux</CardTitle>
      </CardHeader>
      <CardContent>
        <LargestFilesList files={usage.largestFiles} />
      </CardContent>
    </Card>
  );
};