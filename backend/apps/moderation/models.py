from django.conf import settings
from django.db import models


class JobReport(models.Model):
    STATUS_OPEN = "OPEN"
    STATUS_RESOLVED = "RESOLVED"
    STATUS_CHOICES = [(STATUS_OPEN, "Open"), (STATUS_RESOLVED, "Resolved")]

    job = models.ForeignKey("jobs.Job", on_delete=models.CASCADE, related_name="reports")
    reporter = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="job_reports")
    reason = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default=STATUS_OPEN)
    created_at = models.DateTimeField(auto_now_add=True)


class EmployerVerification(models.Model):
    STATUS_PENDING = "PENDING"
    STATUS_APPROVED = "APPROVED"
    STATUS_REJECTED = "REJECTED"
    STATUS_CHOICES = [
        (STATUS_PENDING, "Pending"),
        (STATUS_APPROVED, "Approved"),
        (STATUS_REJECTED, "Rejected"),
    ]

    company = models.OneToOneField("companies.Company", on_delete=models.CASCADE, related_name="verification")
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default=STATUS_PENDING)
    notes = models.TextField(blank=True)
    updated_at = models.DateTimeField(auto_now=True)
