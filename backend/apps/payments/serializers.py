from rest_framework import serializers

from .models import Payment, SubscriptionPlan


class SubscriptionPlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubscriptionPlan
        fields = ("id", "name", "price", "description", "is_active")


class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = ("id", "payer", "plan", "amount", "status", "created_at")
        read_only_fields = ("payer", "created_at")
