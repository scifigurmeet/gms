"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import withAuth from "@/components/withAuth";
import { SidebarTrigger } from "@/components/ui/sidebar";

function SettingsPage() {
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const getUserSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user?.id) {
        setUserId(session.user.id);
      }
    };
    getUserSession();
  }, []);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);

      if (!userId) {
        throw new Error('User not authenticated');
      }

      const file = event.target.files?.[0];
      if (!file) return;

      // Create preview
      setPreviewUrl(URL.createObjectURL(file));

      // Upload image to Supabase storage in user's folder
      const fileName = `${userId}/${Math.random()}-${file.name}`;

      const { error: uploadError } = await supabase.storage
        .from('hello')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('hello')
        .getPublicUrl(fileName);

      setDownloadUrl(publicUrl);
      alert('File uploaded successfully!');
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-1">
        <main className="flex-1 p-4">
          <div className="flex gap-2">
            <SidebarTrigger className="mt-0.5" />
            <h1 className="text-2xl font-bold mb-4">Settings</h1>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>File Upload</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col items-center space-y-4">
                <div className="relative h-32 w-32 rounded-full overflow-hidden border-2 border-gray-200">
                  {previewUrl ? (
                    <Image
                      src={previewUrl}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                      <span className="text-gray-400">No Image</span>
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="avatar-upload"
                    disabled={uploading}
                  />
                  <label htmlFor="avatar-upload">
                    <Button 
                      variant="outline" 
                      disabled={uploading}
                      className="cursor-pointer"
                      asChild
                    >
                      <span>{uploading ? 'Uploading...' : 'Upload New Picture'}</span>
                    </Button>
                  </label>
                  {downloadUrl && (
                    <Button 
                      variant="secondary"
                      onClick={() => window.open(downloadUrl, '_blank')}
                    >
                      Download Image
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}

export default withAuth(SettingsPage);