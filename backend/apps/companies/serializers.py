from rest_framework import serializers

from .models import Company


class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = ("id", "owner", "name", "description", "website", "verified", "created_at")
        read_only_fields = ("owner", "verified", "created_at")
