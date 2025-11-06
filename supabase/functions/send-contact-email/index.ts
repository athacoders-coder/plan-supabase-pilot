import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, phone, message }: ContactFormData = await req.json();

    console.log("Received contact form submission:", { name, email, phone });

    // Send notification email to company
    const companyEmailResponse = await resend.emails.send({
      from: "PT Aratindo Karya Utama <onboarding@resend.dev>",
      to: ["info@aratindokaryautama.com"], // Replace with actual company email
      subject: `Pesan Baru dari ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1a8ca8; border-bottom: 2px solid #1a8ca8; padding-bottom: 10px;">
            Pesan Kontak Baru
          </h2>
          
          <div style="margin: 20px 0;">
            <p><strong>Nama:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Telepon:</strong> ${phone}</p>
          </div>
          
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p style="margin: 0;"><strong>Pesan:</strong></p>
            <p style="margin: 10px 0 0 0; white-space: pre-wrap;">${message}</p>
          </div>
          
          <p style="color: #666; font-size: 12px; margin-top: 30px; border-top: 1px solid #ddd; padding-top: 15px;">
            Email ini dikirim otomatis dari website PT Aratindo Karya Utama
          </p>
        </div>
      `,
    });

    // Send confirmation email to customer
    const customerEmailResponse = await resend.emails.send({
      from: "PT Aratindo Karya Utama <onboarding@resend.dev>",
      to: [email],
      subject: "Terima Kasih Telah Menghubungi PT Aratindo Karya Utama",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1a8ca8; border-bottom: 2px solid #1a8ca8; padding-bottom: 10px;">
            Pesan Anda Telah Kami Terima
          </h2>
          
          <p>Halo <strong>${name}</strong>,</p>
          
          <p>Terima kasih telah menghubungi PT Aratindo Karya Utama. Kami telah menerima pesan Anda dan akan segera merespons dalam waktu 1x24 jam.</p>
          
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p style="margin: 0;"><strong>Detail Pesan Anda:</strong></p>
            <p style="margin: 10px 0 0 0; white-space: pre-wrap;">${message}</p>
          </div>
          
          <p>Jika Anda memiliki pertanyaan mendesak, silakan hubungi kami melalui:</p>
          <ul>
            <li>WhatsApp: +62 812 3456 7890</li>
            <li>Telepon: +62 21 1234 5678</li>
          </ul>
          
          <p>Hormat kami,<br><strong>Tim PT Aratindo Karya Utama</strong></p>
          
          <p style="color: #666; font-size: 12px; margin-top: 30px; border-top: 1px solid #ddd; padding-top: 15px;">
            Email ini dikirim otomatis. Mohon tidak membalas email ini.
          </p>
        </div>
      `,
    });

    console.log("Emails sent successfully:", {
      company: companyEmailResponse,
      customer: customerEmailResponse,
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: "Emails sent successfully",
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || "Failed to send email",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
};

serve(handler);
