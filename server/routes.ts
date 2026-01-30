import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { getUncachableResendClient } from "./resend";

const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  businessName: z.string().optional(),
  email: z.string().email("Valid email is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.post("/api/contact", async (req, res) => {
    try {
      const data = contactFormSchema.parse(req.body);
      
      const { client, fromEmail } = await getUncachableResendClient();
      
      await client.emails.send({
        from: 'KOS2KOS Website <alerts@adullamcommunity.org>',
        to: 'biz.kos2kos@gmail.com',
        replyTo: data.email,
        subject: `New Contact Form Submission from ${data.name}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${data.name}</p>
          ${data.businessName ? `<p><strong>Business:</strong> ${data.businessName}</p>` : ''}
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Message:</strong></p>
          <p>${data.message.replace(/\n/g, '<br>')}</p>
        `,
      });

      res.json({ success: true, message: "Message sent successfully" });
    } catch (error: any) {
      console.error("Contact form error:", error);
      
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          success: false, 
          message: error.errors[0].message 
        });
      }
      
      res.status(500).json({ 
        success: false, 
        message: "Failed to send message. Please try again." 
      });
    }
  });

  return httpServer;
}
